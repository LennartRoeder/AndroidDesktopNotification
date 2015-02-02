package eu.thinking_aloud.notification;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import android.support.v4.content.LocalBroadcastManager;

public class NotificationService extends NotificationListenerService {
    Context context;
    @Override
    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();
    }
    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {

        Intent msgrcv = new Intent("Msg");
        Bundle extras = sbn.getNotification().extras;

        String title = extras.getString("android.title");
        Log.i("Title",title);
        msgrcv.putExtra("title", title);

        if(extras.getCharSequence("android.text") != null) {
            String text = extras.getCharSequence("android.text").toString();
            Log.i("Text",text);
            msgrcv.putExtra("text", text);

        } else if(extras.getCharSequenceArray("android.textLines") != null) {
            String text = "";
            for (CharSequence cs : extras.getCharSequenceArray("android.textLines")) {
                text += cs +" ";
            }
            Log.i("Text",text);
            msgrcv.putExtra("text", text);
        }

        LocalBroadcastManager.getInstance(context).sendBroadcast(msgrcv);
    }
    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        Log.i("Msg","Notification Removed");
    }
}