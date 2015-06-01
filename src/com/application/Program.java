package com.application;

/**
 * Created by eele on 30-4-2015.
 */

        import org.json.simple.JSONObject;

        import javax.swing.*;
        import javax.swing.event.ChangeEvent;
        import javax.swing.event.ChangeListener;
        import java.awt.*;
        import java.io.*;
        import java.util.Random;

public class Program
{
    public JFrame sensorFrame;
    public JSlider testDataSlider;

    public Program(){
        sensorFrame = new JFrame("Sensor KAAS");
        sensorFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        testDataSlider = new JSlider(JSlider.HORIZONTAL,0,1000,500);
        testDataSlider.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                JSlider source = (JSlider) e.getSource();
                Random rand = new Random();
                int batteryData = rand.nextInt(100);
                JSONObject obj = new JSONObject();

                obj.put("Batterij", batteryData);
                obj.put("Servo1", source.getValue());
                PrintWriter writer = null;
                try {
                    writer = new PrintWriter("data.json", "UTF-8");
                } catch (FileNotFoundException e1) {
                    e1.printStackTrace();
                } catch (UnsupportedEncodingException e1) {
                    e1.printStackTrace();
                }
                writer.println(obj);
                writer.close();
            }
        });

        //Turn on labels at major tick marks.
        testDataSlider.setMajorTickSpacing(10);
        testDataSlider.setMinorTickSpacing(1);
        testDataSlider.setPaintTicks(true);
        testDataSlider.setPaintLabels(true);

        sensorFrame.getContentPane().add(testDataSlider, BorderLayout.CENTER);
        sensorFrame.pack();
        sensorFrame.setVisible(true);
        System.out.println("Application started");
    }

    public static void main(String[] args){
        new Program();
    }
}