<template>
  <b-modal
    id="modal-create-todo"
    size="lg"
    title="Criar Todo"
    footer="modal-footer"
  >
    <ValidationObserver
      ref="createForm"
      tag="form"
      @submit.stop.prevent="createTodo()"
    >
      <b-form-group>
        <b-row>
          <b-col cols="6">
            {{ date }}
            <label for="example-datepicker">Finaliza em:</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="date"
            >
              <input
                v-model="date"
                type="date"
                name="date"
                class="form-control"
              />

              <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </b-col>
          <b-col cols="6">
            {{ time }}
            <label for="example-timepicker">Horário:</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="time"
            >
              <input
                v-model="time"
                type="time"
                name="time"
                class="form-control"
                step="2"
              />
              <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </b-col>
        </b-row>
        {{ description }}
        <label for="description">Descrição:</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="description"
        >
          <b-form-textarea id="description" v-model="description" size="lg">
          </b-form-textarea>
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </b-form-group>
    </ValidationObserver>

    <template #modal-footer>
      <div class="w-100">
        <b-button
          class="float-right ml-2"
          size="sm"
          variant="warning"
          @click="createTodo()"
          :disabled="spinner.create"
        >
          <img
            v-if="spinner.create"
            src="@/assets/img/spinner.svg"
            alt=""
            width="20"
            height="20"
            class="d-inline-block"
          />
          Criar Todo
        </b-button>

        <b-button
          class="float-right"
          size="sm"
          variant="danger"
          @click="hideModal(`modal-create-todo`)"
        >
          Cancel
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    time: "",
    date: "",
    description: "",
    spinner: {
      create: false,
    },
  }),
  computed: {
    formatDate() {
      return (param) => {
        let date = new Date(param);
        return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
      };
    },
  },
  methods: {
    hideModal(modalId) {
      this.spinner.create = false;
      this.$root.$emit("bv::hide::modal", modalId);
    },

    async createTodo() {
      const validator = await this.$refs.createForm.validate();
      if (!validator) {
        return;
      }

      this.spinner.create = true;

      const payload = {
        description: this.description,
        ends_at: `${this.date} ${this.time}`,
      };

      this.$axios
        .post(`/todos`, payload)
        .then((response) => {
          console.log("Todo criada com sucesso");
          this.$emit("loadTodos");
        })
        .catch((e) => {
          this.spinner.create = false;
          console.log(e);
        })
        .finally(() => {
          this.spinner.create = false;
        });

      //fechar a modal
      this.hideModal(`modal-create-todo`);
    },
  },
  created() {},
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
</style>
