package com.example.www.smartizenapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.AppCompatImageView;
import android.support.v7.widget.AppCompatTextView;
import android.support.v7.widget.AppCompatButton;
import android.view.View;
import android.content.Intent;




public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void locationMap(View view)
    {
        Intent intent = new Intent(this, MapsActivity.class);
        startActivity(intent);

    }
}