<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<h1 class="d-flex">
				<v-icon x-large color="white"> mdi-airplane </v-icon>
				World Time
			</h1>

			<v-spacer></v-spacer>

			<v-btn color="white" class="black--text" @click="showModal = !showModal">
				<v-icon small class="mr-2" color="black"> mdi-plus </v-icon>
				Add new
			</v-btn>
		</v-app-bar>

		<v-main>
			<CardsList />
		</v-main>

		<Modal v-if="showModal" @closeModal="showModal = false">
			<template v-slot:title> Create new timezone </template>
			<template v-slot:content>
				<v-form v-model="valid" ref="form" @submit.prevent="createTimezone">
					<v-select
						:items="getTimezones"
						label="Timezone"
						item-text="name"
						item-value="id"
						:rules="[(v) => !!v || 'This field is requered!']"
						required
						class="mb-2"
						outlined
						attach=""
						v-model="fields.id"
					></v-select>
					<v-textarea
						name="description"
						label="Description"
						auto-grow
						required
						v-model="fields.description"
						:rules="rules"
						class="mb-6"
						outlined
					></v-textarea>
					<v-btn color="green" dark class="ml-auto d-flex" type="submit">
						Create
					</v-btn>
				</v-form>
			</template>
		</Modal>
	</v-app>
</template>

<script>
	import CardsList from './components/CardsList';
	import Modal from './components/Modal';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'App',

		components: {
			CardsList,
			Modal,
		},
		computed: {
			...mapGetters(['getTimezones', 'getZonesList']),
		},
		data: () => ({
			showModal: false,
			fields: {
				description: '',
			},
			valid: false,
			rules: [
				(v) => v.length <= 120 || 'Max 120 characters',
				(v) => !!v || 'This field is requered!',
				(v) => /^[a-z0-9\s]*$/gi.test(v) || 'Only litin letters and numbers',
			],
			allZones: [],
		}),
		created() {},
		methods: {
			...mapActions(['createNewZone']),
			async createTimezone() {
				this.$refs.form.validate();
				if (this.$refs.form.validate()) {
					this.fields.code = Math.floor(Math.random() * 1000);
					await this.createNewZone(this.fields).then(() => {
						this.fields = {
							description: '',
						};
						this.$refs.form.resetValidation();
						this.showModal = !this.showModal;
					});
				}
			},
		},
	};
</script>
