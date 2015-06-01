package com.websocket;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.*;

/**
 * Created by eele on 25-4-2015.
 */

@ServerEndpoint(value = "/websocket/app")
public class AppServerEndpoint {
    static final String jsonFile = "C:/Users/eele/IdeaProjects/WebApp/data.json";

    private static String readFile(){
        String result = "";
        FileReader fileReader;
        BufferedReader textReader = null;
            try {
            fileReader = new FileReader(jsonFile);
            textReader = new BufferedReader(fileReader);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        try {
            result = textReader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig) {
        RemoteEndpoint.Basic remoteEndpointBasic = session.getBasicRemote();
        session.addMessageHandler(new EchoMessageHandler(remoteEndpointBasic));
        try {
            if(remoteEndpointBasic != null){
                String msg;
                String msgOld = readFile();
                remoteEndpointBasic.sendText(msgOld);
                while(true){
                    msg = readFile();
                    if(!msg.equals(msgOld)){
                        msgOld = msg;
                        remoteEndpointBasic.sendText(msg);
                    }
                    Thread.sleep(300);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private static class EchoMessageHandler implements MessageHandler.Whole<String> {

        private final RemoteEndpoint.Basic remoteEndpointBasic;

        private EchoMessageHandler(RemoteEndpoint.Basic remoteEndpointBasic) {
            this.remoteEndpointBasic = remoteEndpointBasic;
        }

        @Override
        public void onMessage(String s) {
            // do nuttin wut
        }
    }
}