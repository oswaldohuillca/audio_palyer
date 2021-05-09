<template>
    <main class="grid grid-cols-12 grid-rows-none xl:grid-rows-12 h-screen">
        <Sidebar/>
        <Content/>
        <Controlbar/>
    </main>
    
</template>

<script>
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Controlbar from "./components/Controlbar";
import { useStore } from "vuex";
import {  onBeforeMount, onMounted, ref } from 'vue';

export default {
    name: 'App',
    components: {
        Sidebar,
        Content,
        Controlbar
    },
    setup(){
        const store = useStore();     
        onBeforeMount(()=>{
            store.dispatch("getAlbum");
            store.dispatch("getSongs");
        });    
        return {
            //album: computed(()=>store.getters.album)
        }
    }
}
</script>


