package com.reanimatetdexample.RNCMultiplePressable;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class MultiplePressableEvent extends Event<MultiplePressableEvent> {
    public static final String EVENT_NAME = "onMultiplePress";
    private int click;
    private long previousTimeStamp;

    public MultiplePressableEvent(int viewTag, int click, long previousTimeStamp) {
        super(viewTag);
        this.click = click;
        this.previousTimeStamp = previousTimeStamp;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Nullable
    @Override
    protected WritableMap getEventData() {
        WritableMap event = Arguments.createMap();
        event.putInt("click", this.click);
        event.putString("previousTimeStamp", String.valueOf(this.previousTimeStamp));
        return event;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        super.dispatch(rctEventEmitter);
    }
}
