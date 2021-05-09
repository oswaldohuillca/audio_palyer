<template>
    <div class="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2">
        <div class="card ">           
            <figure class="relative">
                <img :src="audio.cover_xl" alt="">
                <div class="w-full h-full top-0 absolute flex items-center justify-center text-white">
                    <button @click="getSong(audio.artist.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="47" height="55" viewBox="0 0 47 55">
                            <path id="Polígono_1" data-name="Polígono 1" 
                                d="M24.048,5.9a4,4,0,0,1,6.9,0L51.478,40.98A4,4,0,0,1,48.025,47H6.975a4,4,0,0,1-3.452-6.02Z"
                                transform="translate(47) rotate(90)" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </figure>
            <div class="card-footer">
                <div class="title">{{audio.title}}</div>
                <div class="artist">{{audio.artist.name}}</div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { useStore } from "vuex";

export default {
    props:{
        data:{
            type:Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        //console.log(props.data);
        const getSong = (id)=>{
            store.dispatch("getSongs",id);
        }
        return{
            audio: props.data,
            getSong
        }
    },
}
</script>
