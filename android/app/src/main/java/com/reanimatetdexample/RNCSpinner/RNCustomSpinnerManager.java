package com.reanimatetdexample.RNCSpinner;

import static java.security.AccessController.getContext;

import android.util.AttributeSet;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.ArrayList;
import java.util.Map;

public class RNCustomSpinnerManager extends SimpleViewManager<RNCustomSpinner> {
    public static final String REACT_NAME = "RNCustomSpinner";
    private AttributeSet attrs;

    @NonNull
    @Override
    public String getName() {
        return REACT_NAME;
    }

    @NonNull
    @Override
    protected RNCustomSpinner createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        RNCustomSpinner spinner = new RNCustomSpinner(themedReactContext);
        ArrayList<String> data = new ArrayList<>();
        data.add("Test1");
        data.add("Test2");
        ArrayAdapter<String> adapter = new
                ArrayAdapter<>(themedReactContext, android.R.layout.simple_spinner_item, data);
        spinner.setAdapter(adapter);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        //Dispatcher Event:
        ReactContext reactContext = themedReactContext;
        EventDispatcher eventDispatcher = reactContext
                .getNativeModule(UIManagerModule.class).getEventDispatcher();

        //OnItemSelected
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String item = (String) parent.getAdapter().getItem(position);
                SpinnerItemClickEvents event = new SpinnerItemClickEvents(view.getId(), position, item);
                eventDispatcher.dispatchEvent(event);
                Toast.makeText(reactContext, "Item Selected "+position, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                Toast.makeText(reactContext, "Nothing selected", Toast.LENGTH_SHORT).show();
            }
        });
        spinner.setGravity(Gravity.CENTER_HORIZONTAL);
        return spinner;
    }

    @ReactProp(name = "width", defaultInt = ViewGroup.LayoutParams.MATCH_PARENT)
    public void setWidth(RNCustomSpinner spinner, int width){
        spinner.setWidth(width);
    }

//    @ReactProp(name = "data")
//    public void setData(RNCustomSpinner spinner, ArrayList<String> data){
//        spinner.setData(data);
//    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                SpinnerItemClickEvents.EVENT_NAME,
                MapBuilder.of("registrationName", "onItemSelected")
        );
    }
}
