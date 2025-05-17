package spring.chat.app.chatapp.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.chat.app.chatapp.entities.Room;


//public interface RepoRoom extends JpaRepository<Room ,String> {
//
//    Room findByRoomId(String roomid);
//}


public interface RepoRoom extends MongoRepository<Room, String> {

    Room findByRoomId(String roomId);
}


