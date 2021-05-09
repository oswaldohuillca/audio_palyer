import { createStore } from 'vuex'
import axios from "axios";
import { API_URI } from "../keys";

const instance = axios.create({
    baseURL: 'https://cors.bridged.cc/https://api.deezer.com',
   
});


export default createStore({
    state: {
        current:{
            
            "id": 3129775,
            "readable": true,
            "title": "Around the World",
            "title_short": "Around the World",
            "title_version": "",
            "link": "https://www.deezer.com/track/3129775",
            "duration": 429,
            "rank": 901190,
            "explicit_lyrics": false,
            "explicit_content_lyrics": 0,
            "explicit_content_cover": 0,
            "preview": "https://cdns-preview-a.dzcdn.net/stream/c-a2ce94cf0655f6cb526e94f5c046b7d5-9.mp3",
            "contributors": [
                {
                    "id": 27,
                    "name": "Daft Punk",
                    "link": "https://www.deezer.com/artist/27",
                    "share": "https://www.deezer.com/artist/27?utm_source=deezer&utm_content=artist-27&utm_term=0_1620503450&utm_medium=web",
                    "picture": "https://api.deezer.com/artist/27/image",
                    "picture_small": "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg",
                    "picture_medium": "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/250x250-000000-80-0-0.jpg",
                    "picture_big": "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/500x500-000000-80-0-0.jpg",
                    "picture_xl": "https://cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/1000x1000-000000-80-0-0.jpg",
                    "radio": true,
                    "tracklist": "https://api.deezer.com/artist/27/top?limit=50",
                    "type": "artist",
                    "role": "Main"
                }
            ],
            "md5_image": "b870579c8650cd59b1cce656dde2ef17",
            "artist": {
                "id": 27,
                "name": "Daft Punk",
                "tracklist": "https://api.deezer.com/artist/27/top?limit=50",
                "type": "artist"
            },
            "album": {
                "id": 301775,
                "title": "Homework",
                "cover": "https://api.deezer.com/album/301775/image",
                "cover_small": "https://cdns-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/56x56-000000-80-0-0.jpg",
                "cover_medium": "https://cdns-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/250x250-000000-80-0-0.jpg",
                "cover_big": "https://cdns-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/500x500-000000-80-0-0.jpg",
                "cover_xl": "https://cdns-images.dzcdn.net/images/cover/b870579c8650cd59b1cce656dde2ef17/1000x1000-000000-80-0-0.jpg",
                "md5_image": "b870579c8650cd59b1cce656dde2ef17",
                "tracklist": "https://api.deezer.com/album/301775/tracks",
                "type": "album"
            },
            "type": "track"
        
        },
        index:0,
        isPlaying:false,
        player: new Audio(),
        songs:[],
        song:{
            releases:[]
        },
        artist:{},
        filter:{
            query:""
        }
    },
    getters:{
        releases: state => {
            const releases = state.song.releases;
            if (state.filter.query.length > 2) {
               return releases.filter(el => el.artist.name.toLowerCase().includes(state.filter.query) || el.title.toLowerCase().includes(state.filter.query))
            }
            return releases;
        },
        songs: state => state.songs,
        current: state => state.current,
        panel: state => state.songs[0]
    },
    mutations: {
        RELEASES_SUCCESS(state,payload){
            state.song.releases = payload;
        },
        PLAY(state){
            state.player.src = state.current.preview;
            state.player.play();
            state.isPlaying = true;
        },
        SET_CURRENT_SONG(state,payload){
            state.current = payload;
        },
        SONGS_SUCCESS(state,payload){
            state.songs = payload;
        },
        SEARCH(state,payload){
            state.filter.query = payload;
        },
        ARTIST_DATA_SUCCESS(state,payload){
            state.artist = payload;
        }
        
    },
    actions: {
        async getAlbum({commit},payload){
            if (!payload) {
                //9999990
                const res = await instance.get(`/editorial/0/releases?limit=1000`);

                if(res.status === 200){
                    commit("RELEASES_SUCCESS", res.data.data)
                }
            }           

        },
        async getSongs({commit},payload){
            const res = await instance.get(`/artist/${payload?payload:'27'}/top?limit=100`);
            if (res.status == 200) {
                commit("SONGS_SUCCESS", res.data.data)
            }
            return res;
        },
        async getArtistSongs({commit}, payload){
            if (payload) {              
                const res = await instance.get(`/artist/${payload.artist.id}`);
                commit("ARTIST_DATA_SUCCESS", res.data)
            }            
        }
      
    },
    modules: {
    }
})
