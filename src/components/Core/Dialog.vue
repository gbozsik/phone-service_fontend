<template>
    <div>
    <template v-if="fullscreen">
        <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark :color="color">
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn v-for="action in actions" :key="action.text" dark flat @click.native="action.click()">{{action.text}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <slot></slot>
            </v-card>
        </v-dialog>
    </template>
    <template v-else>
        <v-dialog v-model="show" persistent>
            <v-card>
                <v-toolbar dark :color="color">
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn v-for="action in actions" :key="action.text" dark flat @click.native="action.click()">{{action.text}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <slot></slot>
            </v-card>
        </v-dialog>
    </template>  
    </div>
</template>

<script>

export default {
    props: {
        show:           { type: Boolean, default: false, required: true },
        title:          { type: String, default: "Dialog title", required: true },
        color:          { type: String, default: "primary", required: false },
        fullscreen:     { type: Boolean, default: false, required: false },
        actions:        { type: Array, default: () => [], required: false },
        //onCancel:       { type: Function, default: null, required: true },
        //onOk:           { type: Function, default: null, required: true },
        //okBtnText:      { type: String, default: "OK", required: false },
        //cancelBtnText:  { type: String, default: "Mégse", required: false },
    },
}
</script>