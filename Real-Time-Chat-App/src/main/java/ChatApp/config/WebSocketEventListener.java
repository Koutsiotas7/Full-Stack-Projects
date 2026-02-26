package ChatApp.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import ChatApp.chat.ChatMessage;
import ChatApp.chat.MessageType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class WebSocketEventListener 
{
	private final SimpMessageSendingOperations messageTemplate;
	private static final Logger log = LoggerFactory.getLogger(WebSocketEventListener.class);
	
	 public WebSocketEventListener(SimpMessageSendingOperations messageTemplate) 
	 {
	        this.messageTemplate = messageTemplate;
	 }
	
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event)
	{
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		
		if(username != null)
		{
			log.info("User disconnected: {}", username);
			var chatMessage = ChatMessage.builder()
					.type(MessageType.LEAVE)
					.sender(username)
					.build();
			
			messageTemplate.convertAndSend("/topic/public" , chatMessage);
			
		}
	}
}
