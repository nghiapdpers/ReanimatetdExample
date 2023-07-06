package com.reanimatetdexample.RNCMultiplePressable;

import android.content.Context;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Date;

public class RNCMultiplePressableView extends View {
    private int delay = 500;
    private int click = 1;
    private long previousTimeStamp = new Date().getTime();

    public RNCMultiplePressableView(Context context) {
        super(context);
        setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                long currentTimeStamp = new Date().getTime();
                if(currentTimeStamp - previousTimeStamp <= delay){
                    click++;
                    previousTimeStamp = currentTimeStamp ;
                }else {
                    previousTimeStamp = currentTimeStamp;
                    click = 1;
                }
                ReactContext reactContext = (ReactContext) getContext();
                EventDispatcher eventDispatcher = reactContext
                        .getNativeModule(UIManagerModule.class).getEventDispatcher();

                MultiplePressableEvent event = new MultiplePressableEvent(getId(), click, previousTimeStamp);

                eventDispatcher.dispatchEvent(event);
            }
        });
    }

    public int getDelay() {
        return delay;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public int getClick() {
        return click;
    }

    private void onMultiplePress() {
        WritableMap event = Arguments.createMap();
        event.putInt("click", click);
        event.putString("previousTimeStamp", String.valueOf(previousTimeStamp));
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "multiplePress", event);
    }
}
