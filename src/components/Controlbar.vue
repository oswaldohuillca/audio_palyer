<template>
    <footer class="col-span-12 row-span-1 bg-theme-1 grid grid-cols-3 h-initial">
        <div class="col-span-3 md:col-span-1 flex overflow-hidden">
            
            <div class=" w-20 bg-cover bg-no-repeat bg-center" :style="{'background-image': 'url('+current.album.cover_xl+')'}">
                
            </div>
            <div class="col-span-5  flex items-center text-white p-4">    
                <div class="">
                    <h3>
                        {{current.title}}
                    </h3>
                    <p>{{current.artist.name}} - {{current.album.title}}</p>
                </div>
            </div>
        </div>
        <div class="col-span-3 md:col-span-1">
            <div class="control-buttons h-full w-full flex justify-center align-center items-center">
                <button @click="prev">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <polygon points="19 20 9 12 19 4 19 20"></polygon>
                        <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                </button>
                <button v-if="!isPlayind" @click="played" class="control-play w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center mx-5">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="ml-1 text-white ">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </button>
                <button v-if="isPlayind" @click="pause" class="control-pause w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center mx-5">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class=" text-white">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                </button>
                <button @click="next">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-white ">
                        <polygon points="5 4 15 12 5 20 5 4"></polygon>
                        <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="col-span-3 md:col-span-1">
            <div class="w-full h-full flex items-center justify-center md:justify-end px-4">
                <input v-model="volume"  type="range" min="0" max="1" step="0.1" class="mr-3">
                <button v-if="volume != 0" @click="volume = 0">
                    <svg  viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                </button>
                <button v-if="volume == 0" @click="mute">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                </button>
            </div>

        </div>
    </footer>
</template>
<script>
import { computed, ref, watchEffect } from 'vue';
import { useStore } from "vuex";
export default {
    setup() {
        //GENERALS
        const store = useStore();
        const volume = ref(0.5);

        //PLAY
        const played = ()=>{
            store.state.player.play();
            store.state.player.addEventListener("ended",play);
            store.state.isPlaying = true;
        }   
        const play = ()=>{
            store.commit("PLAY");    
            playerListener();
        }
        //PAUSE
        const pause = ()=>{
            store.state.player.pause();
            store.state.isPlaying = false;
        }
        //NEXT 
        const next = () => {
            const songs = computed(()=>store.getters.songs).value;
            if (store.state.index  < songs.length-1) {
                store.state.current = songs[store.state.index = store.state.index+1];            
                play();
            }            
        }
        //PREV

        const prev = () => {            
            const songs = computed(()=>store.getters.songs).value;
            if (store.state.index > 0) {
                store.state.current = songs[store.state.index = store.state.index-1];            
                play();
            }                        
        }
        //MUTE
        const mute = ()=>{
            store.state.player.volume = 0.5;
            volume.value = 0.5; 
        }
        //LISTENERS
        const playerListener = ()=>{
            store.state.player.addEventListener("ended",next)
        }

        watchEffect(()=>{
            store.state.player.volume = volume.value
        })
        return {
            volume,
            prev,
            play,
            played,
            pause,
            next,
            mute,
            isPlayind: computed(()=>store.state.isPlaying),
            current: computed(()=>store.getters.current)
            
        }
    },
}
</script>