package spring.chat.app.chatapp.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class MessageRequest {
    private String sender;
    private String content;
    //private String sendMessage;
    private String roomId;
    private LocalDateTime messageTime;

}
