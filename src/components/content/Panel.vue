<template>
    <div v-if="artist" class="col-span-12 grid grid-cols-3">
        <figure class="col-span-1">
            <img class="bg-local " :src="artist.album.cover_xl"  alt="">
        </figure>
        <div class="col-span-2  text-white bg-cover" :style="{'background-image':'url('+artistData.picture_xl+')'}">
            <div class="block h-full p-3 bg-theme-2 bg-opacity-50 relative">
                <h3 class="text-3xl font-bold">{{artist.artist.name}}</h3>
                <p>Lo mejor de {{artist.artist.name}} <span class="text-theme-2 ml-3 font-bold">{{artistData.nb_fan}} seguidores</span> </p>
                <p class="mb-6 overflow-clip overflow-hidden" style="height:70px">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ut dolorum assumenda in eligendi maxime nostrum hic minus ullam placeat repellat a id modi dolore similique provident dolorem, cum perspiciatis.
                Id enim nobis fuga, ipsam in odio tenetur ullam, a, eos vero nostrum error eaque </p>
                <div class="absolute bottom-5 left-5 flex">
                    <button @click="setCurrent" class="hidden xl:block bg-theme-3 rounded-full w-32 px-4 h-10 flex items-center justify-center">
                        Reproducir
                    </button>
                    <button class="hidden xl:block border-2 border-theme-3 rounded-full w-32 h-10 flex items-center justify-center  ml-3">
                        Seguir
                    </button>
                    <button class="rounded-full w-20 px-4 flex items-center justify-start xl:justify-center ml-0 xl: ml-3">
                        <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="1.95652" cy="2" rx="1.95652" ry="2" fill="white"/>
                            <ellipse cx="9" cy="2" rx="1.95652" ry="2" fill="white"/>
                            <ellipse cx="16.0435" cy="2" rx="1.95652" ry="2" fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();

        function setCurrent(){
            store.state.current = computed(()=>store.getters.panel).value;
            store.commit("PLAY");    
        }
        const getArtistData =  ()=>{
            store.dispatch("getArtistSongs",computed(()=>store.getters.panel).value)
        }
        watchEffect(()=>{
            getArtistData()
        })
        return{
            artistData: computed(()=> store.state.artist),
            setCurrent,
            artist:computed(()=>store.getters.panel),

        }
    },
}
</script>