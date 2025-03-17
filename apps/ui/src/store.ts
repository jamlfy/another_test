import { defineStore } from 'pinia';
import { ref } from 'vue';

export const auth = defineStore(() => {
  const token = ref('');
  const headers = computed(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.value}`,
  }));

  const login = async (email, pass, isNew = false) => {
    if (isNew) {
      const { accessToken } = await fecth(`/api/login`, {
        method: 'POST',
        body: JSON.stringify({ username: 'example' }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((e) => e.json());
      token.value = accessToken;
    } else {
      const { accessToken } = await fecth(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'example' }),
      }).then((e) => e.json());
      token.value = accessToken;
    }
  };

  const logout = () => {
    const { error } = await fecth(`/api/logout`, {
      method: 'POST',
      headers,
    }).then((e) => e.json());
  };

  return {
    login,
    logout,
    headers,
  };
});

export const stock = defineStore(() => {
  const { headers } = auth();
  const data = ref({});

  const getStock = async (name) => {
    if (!data.value[name]) {
      data.value = {
        ...data.value,
        [name]: fecth(`/api/${name}/info`, {
          method: 'GET',
          headers,
        }).then((e) => e.json()),
      };
    }

    return data.value[name];
  };

  const getHistory = async (name) => {
    const { _id } = await getStock(name);
    if (!data.value[_id]) {
      data.value = {
        ...data.value,
        [_id]: fecth(`/api/${_id}/history`, {
          method: 'GET',
          headers,
        }).then((e) => e.json()),
      };
    }

    return data.value[_id];
  };

  const reset = async (name) => {
    if (name) {
      const { _id } = await getStock(name);
      data.value[name] = null;
      data.value[_id] = null;
      return true;
    }

    data.value = {};
    return true;
  };

  return {
    getStock,
    getHistory,
    reset,
  };
});
