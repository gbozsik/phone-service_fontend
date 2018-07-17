<template>
    <div>
    <template v-if="fullscreen">
        <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark :color="color">
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="onClose()">{{okText}}</v-btn>
                        <v-btn dark flat @click.native="onClose()">{{cancelText}}</v-btn>
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
                        <v-btn dark flat @click.native="onClose()">{{okText}}</v-btn>
                        <v-btn dark flat @click.native="onClose()">{{cancelText}}</v-btn>
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
    props: [
        'show', 
        'title',
        'color', 
        'onClose', 
        'fullscreen',
        'okText',
        'cancelText'
    ], 
}
</script>