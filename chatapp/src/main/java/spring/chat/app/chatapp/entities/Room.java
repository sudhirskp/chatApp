package spring.chat.app.chatapp.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Room{

    @Id
    private String id;
    private String roomId; //by user --mongo identifire

    private List<Message> massageList = new ArrayList<>();

}
