<template>
    <section class="col-span-12 xl:col-span-9 row-auto overflow-visible xl:overflow-y-auto xl:row-span-11   p-5 grid grid-cols-12 gap-3">
        <Search/>
        <Userinfo/>
        <Panel/>
        <h3 class="text-theme-2 col-span-12 font-bold text-lg">Resultados</h3>
        <!--<pre v-if="album.tracks">{{album.tracks.data}} </pre>-->
        <template v-if="releases">           
            <div v-for="item in releases" :key="item.id" class="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2">
                <div class="card ">           
                    <figure class="relative">
                        <img :src="item.cover_xl" alt="">
                        <div class="w-full h-full top-0 absolute flex items-center justify-center text-white">
                            <button @click="getSongs(item.artist.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="47" height="55" viewBox="0 0 47 55">
                                    <path id="Polígono_1" data-name="Polígono 1" 
                                        d="M24.048,5.9a4,4,0,0,1,6.9,0L51.478,40.98A4,4,0,0,1,48.025,47H6.975a4,4,0,0,1-3.452-6.02Z"
                                        transform="translate(47) rotate(90)" fill="#fff" />
                                </svg>
                            </button>
                        </div>
                    </figure>
                    <div class="card-footer">
                        <div class="title text-theme-5 font-bold">{{item.title}}</div>
                        <div class="artist text-theme-6">{{item.artist.name}}</div>
                    </div>
                </div>
            </div>
        </template>
        <div class="col-span-12">
            <button v-for="i in total" :key="i" class="w-10 h-10 border-theme-2 border rounded-full mx-1 my-1 text-theme-5" @click="pag.start = i">{{i}}</button>
        </div>

        <template v-if="releases.length == 0">         
            <div  class="col-span-12 ">
                No hay resultados
            </div>
        </template>
        
    </section>
</template>
<script>

import Search from "./content/Search";
import Userinfo from "./content/Userinfo";
import Panel from "./content/Panel";
import Audio from "./content/Audio";
import { useStore } from "vuex";
import { computed, ref, watchEffect } from 'vue';
import Pagination from "../helpers/pagination";
export  default{
    components:{
        Search,
        Userinfo,
        Panel,
        Audio
    },
    setup() {
        const store = useStore(); 
        const songs = ref([]);
        const pag = ref(null);

        const getSongs = async (id) =>{
            const res =await store.dispatch("getSongs",id);
            if(res.status == 200){
                //release.value = false;
                songs.value = res.data
                setCurrent()
            }
        }
        //PLAY 
        const setCurrent = () => {
            const xk = computed(()=>store.getters.songs);
            store.state.current = xk.value[store.state.index];

            store.commit("PLAY");
            store.state.player.addEventListener("ended",()=>{// OBSERVAMOS SI TERMINA EL AUDIO
                store.state.isPlaying = false;
            })
        }


        watchEffect(()=>{
            pag.value = new Pagination(1,12);
        })

        
        return{    
            pag,        
            releases: computed(()=>pag.value.paginate(computed(()=>store.getters.releases).value)),
            total: computed(()=>pag.value.totalPages(computed(()=>store.getters.releases).value)),
            songs,
            getSongs,
            setCurrent,
            //NEXT
            
        }
    },
}
</script>
