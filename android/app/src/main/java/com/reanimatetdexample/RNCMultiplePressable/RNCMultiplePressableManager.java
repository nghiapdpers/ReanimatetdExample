package com.reanimatetdexample.RNCMultiplePressable;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RNCMultiplePressableManager extends SimpleViewManager<RNCMultiplePressableView> {
    public static final String REACT_CLASS = "RNCMultiplePressable";


    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected RNCMultiplePressableView createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        return new RNCMultiplePressableView(themedReactContext);
    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                MultiplePressableEvent.EVENT_NAME,
                MapBuilder.of("registrationName", "onMultiplePress")
        );
    }

    @ReactProp(name = "delay", defaultInt = 500)
    public void setDelay(RNCMultiplePressableView view, int delay) {
        view.setDelay(delay);
    }
}
