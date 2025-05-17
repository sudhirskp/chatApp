package spring.chat.app.chatapp.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring.chat.app.chatapp.Repo.RepoRoom;
import spring.chat.app.chatapp.entities.Message;
import spring.chat.app.chatapp.entities.Room;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private RepoRoom roomRepository;

    public RoomController(RepoRoom roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Create a room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        if (roomRepository.findByRoomId(roomId) != null) {
            return ResponseEntity.badRequest().body("Room already exists");
            //return ResponseEntity.badRequest().body(Map.of("error", "Room already exists"));

        }

        Room newRoom = new Room();
        newRoom.setRoomId(roomId);
        Room savedRoom = roomRepository.save(newRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }

    // Join a room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        if (room == null) {
            return ResponseEntity.badRequest().body("Room not found !!");
        }
        return ResponseEntity.ok(room);
    }

    // Get messages of the room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
                                                     @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                     @RequestParam(value = "size", defaultValue = "20", required = false) int size){
        Room room = roomRepository.findByRoomId(roomId);

        if (room == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Message> messages = room.getMassageList();
        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(), start + size);
        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);
    }


}

