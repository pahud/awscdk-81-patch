package com.myorg;

import software.amazon.awscdk.core.App;
import com.github.eladb.awscdk81patch.Patch;



public class JavaApp {
    public static void main(final String[] args) {
        Patch.apply();

        App app = new App();

        new JavaStack(app, "JavaStack");

        app.synth();
    }
}
