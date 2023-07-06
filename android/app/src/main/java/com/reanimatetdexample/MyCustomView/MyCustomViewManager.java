package com.reanimatetdexample.MyCustomView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class MyCustomViewManager extends SimpleViewManager<CustomView> {
    public static final String REACT_NAME = "RNCustomView";
    @NonNull
    @Override
    public String getName() {
        return REACT_NAME;
    }

    @NonNull
    @Override
    protected CustomView createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        return new CustomView(themedReactContext);
    }

    @ReactProp(name ="isOn")
    public void setIsOn(CustomView v, boolean isOn){
        v.setOn(isOn);
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "changeStatus",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onStatusChange")))
                .build();
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return super.getExportedCustomDirectEventTypeConstants();
    }
}
