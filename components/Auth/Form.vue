<template>
  <div>
    <div class="space-y-6 pt-5">
      <UIInput
        label="Username"
        placeholder="@username"
        v-model="data.username"
      />
      <UIInput
        label="Password"
        placeholder="********"
        type="password"
        v-model="data.password"
      />
      <div>
        <button @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

const handleLogin = async () => {
  const { login } = useAuth();

  data.loading = true;

  try {
    await login({
      password: data.password,
      username: data.username,
    });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
};
</script>
