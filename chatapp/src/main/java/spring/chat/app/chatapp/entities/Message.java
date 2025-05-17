package spring.chat.app.chatapp.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Message {

    private String sender;
    private String content;

    private LocalDateTime timestamp;

    public Message(String sender , String content){
        this.content= content;
        this.sender = sender;
        this.timestamp = LocalDateTime.now();
    }

}
