package com.reanimatetdexample.MyCustomView;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reanimatetdexample.RNCMultiplePressable.RNCMultiplePressableManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MyCustomViewPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.asList(new MyCustomViewManager());
    }
}
