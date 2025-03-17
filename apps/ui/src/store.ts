import { defineStore } from 'pinia';
import { ref } from 'vue';

export const stock = defineStore(() => {
	const data = ref({});

	const getStock = async (name) => {
		if(!data.value[name]){
			data.value = {
				...data.value,
				[name]: fecth(`/api/${name}/info`).then((e) => e.json()),
			};
		}

		return data.value[name];
	};

	const getHistory = async (name) => {
		const { _id } = await getStock(name);
		if(!data.value[_id]){
			data.value = {
				...data.value,
				[_id]: fecth(`/api/${_id}/history`).then((e) => e.json()),
			};
		}

		return data.value[_id];
	};


	const reset = async (name) => {
		if(name){
			const { _id } = await getStock(name);
			data.value[name] = null;
			data.value[_id] = null;
			return true;
		}


		data.value = {}
		return true;
	};


	return {
		getStock,
		getHistory,
		reset
	}
});