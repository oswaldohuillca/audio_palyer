<template>
    <div class="form-group col-span-6">
        <input v-model="search"   type="text" class="form-control" placeholder="Buscar...">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round" class="icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore();
        const search = computed({
            get(){
                return store.state.filter.query
            },
            set(val){
                store.commit("SEARCH",val)
            }
        });
        
        return{
            search
        }
    },
}
</script>