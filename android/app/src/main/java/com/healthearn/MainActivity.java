package com.healthearn;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "HealthEarn";
  }

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  // super.onCreate(savedInstanceState);
  // hideNavigationBar();
  // }

  // @Override
  // public void onWindowFocusChanged(boolean hasFocus) {
  // super.onWindowFocusChanged(hasFocus);
  // if (hasFocus) {
  // hideNavigationBar();
  // }
  // }

  // private void hideNavigationBar() {
  // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);

  // }

}
