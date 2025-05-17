package spring.chat.app.chatapp.Controller;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import spring.chat.app.chatapp.Repo.RepoRoom;
import spring.chat.app.chatapp.entities.Message;
import spring.chat.app.chatapp.entities.Room;
import spring.chat.app.chatapp.payload.MessageRequest;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private RepoRoom roomRepository;


    public ChatController(RepoRoom RoomRepository) {
        this.roomRepository = RoomRepository;
    }

    //for sending and receiving the messages

    @MessageMapping("sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")

    public Message sendmessage(

            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
    ) throws Exception{
        Room room = roomRepository.findByRoomId(roomId);

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now());

        if(room != null){
            room.getMassageList().add(message);
            roomRepository.save(room);
        }
        else{
            throw new RuntimeException("Room not found");
        }
           return message;
    }
}
