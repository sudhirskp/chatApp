package spring.chat.app.chatapp.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocket implements WebSocketMessageBrokerConfigurer {
//
//    @Value("${allowed.origins:https://courageous-cheesecake-916884.netlify.app/}")
//    private String[] allowedOrigins;
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/chat")
//                .setAllowedOriginPatterns(allowedOrigins)  // Changed to setAllowedOriginPatterns
//                .withSockJS();
//    }
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//
//
//        config.enableSimpleBroker("/topic");
//
//        config.setApplicationDestinationPrefixes("/app");
//
//    }
//}


// WebSocket.java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocket implements WebSocketMessageBrokerConfigurer {

    @Value("${allowed.origins:https://courageous-cheesecake-916884.netlify.app}")
    private String[] allowedOrigins;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns(allowedOrigins)  // works with patterns
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
}
