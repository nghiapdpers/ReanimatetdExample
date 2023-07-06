package com.reanimatetdexample.MyCustomView;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.Button;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class CustomView extends androidx.appcompat.widget.AppCompatButton {
    public boolean isOn = false;

    public CustomView(Context context) {
        super(context);
        setText("My custom view from java");
        setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                isOn = !isOn;
                updateButton();
                onStatusChange();
            }
        });
    }

    public void setOn(boolean on) {
        isOn = on;
        updateButton();
    }

    public void updateButton(){
        if(isOn){
            this.setBackgroundColor(Color.MAGENTA);
        }else{
            this.setBackgroundColor(Color.GREEN);
        }
    }

    private void onStatusChange(){
        WritableMap event = Arguments.createMap();
        event.putBoolean("status", isOn);
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "changeStatus", event);
    }
}
