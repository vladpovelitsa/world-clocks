<template>
	<div class="modal">
        <div class="modal_content">
            <v-btn x-small color="gray lighten-4 ml-auto mb-4 d-flex" fab @click='hideModal'>
                 <v-icon
                    color="gray lighten-4" 
                    small
                >
                    mdi-close
                </v-icon>
            </v-btn>
            <h2 class="text-h4 text-center mb-10">
                <slot name='title'>
                    Add new timezone
                </slot>
            </h2>
            <slot name='content'></slot>
        </div>
	</div>
</template>

<script>
	export default {
		name: 'Modal',
		components: {},
		data: () => ({
            
        }),

		
        methods: {
            hideModal(){
                this.$emit('closeModal', false)
            }
        }
	};
</script>


<style scoped lang='scss'>
    .modal {
        display: flex;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 99;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);

        &_content {
            background: #fff;
            max-width: 450px;
            width: 100%;
            max-height: 80%;
            overflow: hidden auto ;
            padding: 20px 15px 30px;
            margin: auto;

        }
    }
</style>