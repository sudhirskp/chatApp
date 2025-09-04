package spring.chat.app.chatapp.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import spring.chat.app.chatapp.entities.Room;


public interface RepoRoom extends MongoRepository<Room, String> {

    Room findByRoomId(String roomId);

}


