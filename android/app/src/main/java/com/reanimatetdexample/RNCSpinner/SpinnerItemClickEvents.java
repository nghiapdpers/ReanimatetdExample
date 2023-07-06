package com.reanimatetdexample.RNCSpinner;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class SpinnerItemClickEvents extends Event<SpinnerItemClickEvents> {
    public static final String EVENT_NAME = "SpinnerItemClick";
    private int id;
    private String item;

    public SpinnerItemClickEvents(int viewTag, int id, String item) {
        super(viewTag);
        this.id = id;
        this.item = item;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Nullable
    @Override
    protected WritableMap getEventData() {
        WritableMap event = Arguments.createMap();
        event.putInt("id", id);
        event.putString("item", item);
        return event;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        super.dispatch(rctEventEmitter);
    }
}
