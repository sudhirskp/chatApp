package spring.chat.app.chatapp.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import spring.chat.app.chatapp.Repo.RepoRoom;
import spring.chat.app.chatapp.entities.Message;
import spring.chat.app.chatapp.entities.Room;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        }

        Room newRoom = new Room();
        newRoom.setRoomId(roomId);
        Room savedRoom = roomRepository.save(newRoom);
        
        Map<String, Object> response = new HashMap<>();
        response.put("roomId", savedRoom.getRoomId());
        response.put("id", savedRoom.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

    //leave the room
    //leave the room (client-side should handle navigation/disconnect)
    @PostMapping("/app/leaveRoom/{roomId}")
    public ResponseEntity<?> leaveRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        if (room == null) {
            return ResponseEntity.badRequest().body("Room not found");
        }
        // No deletion, just acknowledge
        return ResponseEntity.ok("Left the room");
    }

        //to close the room
//        @DeleteMapping("/{roomId}")
//        public ResponseEntity<?> closeRoom(@PathVariable String roomId) {
//            Room room = roomRepository.findByRoomId(roomId);
//
//            if (room == null) {
//                return ResponseEntity.badRequest().body("Room not found");
//            }
//
//            roomRepository.delete(room);
//            return ResponseEntity.ok().build();
//        }

        //when the room closed by the room creater all the messages will be deleted form the database including the roomId
//        @DeleteMapping("/app/closeRoom/{roomId}")
//        public ResponseEntity<?> closeRoomByCreator(@PathVariable String roomId) {
//            Room room = roomRepository.findByRoomId(roomId);
//
//            if (room == null) {
//                return ResponseEntity.badRequest().body("Room not found");
//            }
//
//            // Clear all messages before deleting the room
//            room.getMassageList().clear();
//           // roomRepository.save(room);
//
//            roomRepository.delete(room);
//            return ResponseEntity.ok().build();
//        }


    @MessageMapping("/closeRoom/{roomId}")
    public void closeRoomByCreator(@DestinationVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);

        if (room != null) {
            room.getMassageList().clear();
            roomRepository.delete(room);
        }
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

