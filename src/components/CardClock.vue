<template>
	<div>
		<v-card @click="showModal = !showModal">
			<div class="card-bg" v-if="+time.hours < 6 || +time.hours >= 20">
				<img src="../assets/img/night.jpg" alt="night" />
			</div>
			<div class="card-bg" v-else>
				<img src="../assets/img/day.jpg" alt="day" />
			</div>
			<v-card-title class="blue--text mb-2">
				<v-icon color="blue lighter-2" large class="mr-2">
					mdi-clock-outline</v-icon
				>
				<div class="text-h4">
					{{ +time.hours | roundHours | timeFilter }} :
					{{ +time.minutes | roundMinutes | timeFilter }} :
					{{ +time.seconds | timeFilter }}
				</div>
			</v-card-title>
			<v-card-subtitle class="d-flex align-end white--text">
				<div class="text-h4 mr-4">{{ currentTimezone.name }}</div>
				<div class="text-h6">
					({{ currentTimezone.position === 'east' ? '+' : '-'
					}}{{ currentTimezone.offsetHours | timeFilter }}:{{
						currentTimezone.offsetMinutes | timeFilter
					}})
				</div>
			</v-card-subtitle>
			<v-card-text class="white--text">
				{{ currentTimezone.fullname }}
			</v-card-text>
			<v-card-text class="white--text">
				{{ zoneInfo.description }}
			</v-card-text>
		</v-card>

		<Modal v-if="showModal" @closeModal="showModal = false">
			<template v-slot:title> Edit timezone </template>

			<template v-slot:content>
				<v-form v-model="valid" ref="form" @submit.prevent="editTimezone()">
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
						v-model="zoneInfo.id"
					></v-select>
					<v-textarea
						name="description"
						label="Description"
						auto-grow
						required
						v-model="zoneInfo.description"
						:rules="rules"
						class="mb-6"
						outlined
					></v-textarea>
					<div class="d-flex">
						<v-btn color="green" dark class="ml-auto d-flex" type="submit">
							<v-icon dark class="mr-2"> mdi-check </v-icon>
							Save
						</v-btn>
						<v-btn
							color="red"
							dark
							class="ml-4 d-flex"
							type="button"
							@click.prevent="removeTimezone(id)"
						>
							<v-icon dark class="mr-2"> mdi-delete </v-icon>
							Remove
						</v-btn>
					</div>
				</v-form>
			</template>
		</Modal>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import Modal from './Modal';

	export default {
		name: 'CardClock',
		components: {
			Modal,
		},
		computed: {
			...mapGetters(['getTimezones', 'getZonesList']),
		},
		props: {
			id: {
				required: true,
			},
			zoneInfo: {
				required: true,
			},
		},
		data: () => ({
			currentTimezone: {},
			time: {
				minutes: 0,
				hours: 0,
				seconds: 0,
				background: '',
			},
			allZones: [],
			valid: false,
			showModal: false,
			rules: [
				(v) => v.length <= 120 || 'Max 120 characters',
				(v) => !!v || 'This field is requered!',
				(v) => /^[a-z0-9\s]*$/gi.test(v) || 'Only litin letters and numbers',
			],
		}),
		methods: {
			...mapActions(['fetchZoneInfo', 'fetchZones']),

			setTime() {
				this.time.hours = Math.floor(
					((new Date().getUTCHours() + +this.currentTimezone.offsetHours) * 60 +
						new Date().getUTCMinutes() +
						+this.currentTimezone.offsetMinutes) /
						60
				);
				this.time.minutes =
					new Date().getUTCMinutes() + +this.currentTimezone.offsetMinutes;
				this.time.seconds = new Date().getSeconds();
				this.time.background =
					+this.time.hours < 6 && +this.time.hours > 22
						? '../assets/img/night.jpg'
						: '../assets/img/day.jpg';
			},
			startCounting() {
				setInterval(() => {
					this.setTime();
				}, 1000);
			},
			editTimezone(id) {
				this.getZonesList[id] = this.zoneInfo;

				localStorage.setItem('zones', JSON.stringify(this.getZonesList));
				this.fetchZones();
				this.showModal = !this.showModal;
			},
			removeTimezone(id) {
				this.getZonesList.splice(id, 1);

				localStorage.setItem('zones', JSON.stringify(this.getZonesList));
				this.fetchZones();
				this.showModal = !this.showModal;
			},
		},
		async created() {
			await this.fetchZones()
				.then(() => {
					this.getTimezones.forEach((item) => {
						if (item.id === this.zoneInfo.id) {
							this.currentTimezone = item;
						}
					});
				})
				.then(() => this.startCounting());
		},
		filters: {
			roundHours(value) {
				if (+value > 24) {
					value = value - 24;
				} else if (+value < 0) {
					value = 24 - -value;
				}
				return +value;
			},
			roundMinutes(value) {
				if (+value > 60) {
					value = value - 60;
				} else if (+value < 0) {
					value = 60 - -value;
				}
				return +value;
			},
			timeFilter(value) {
				if (+value < 10) {
					value = '0' + Math.abs(value);
				}
				return value;
			},
		},
	};
</script>

<style scoped lang="scss">
	.v-card {
		position: relative;
		z-index: 1;
		overflow: hidden;
	}
	.card-bg {
		position: absolute;
		width: 100%;
		height: 100%;

		z-index: -1;
		img {
			object-fit: cover;
			object-position: bottom;
			width: 100%;
			height: 100%;
			display: block;
		}
		&:before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.4);
			top: 0;
			left: 0;
		}
	}
</style>
