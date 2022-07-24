<template>
  <b-modal
    id="modal-create-task"
    size="lg"
    title="Criar Task"
    footer="modal-footer"
  >
    <ValidationObserver
      ref="createForm"
      tag="form"
      @submit.stop.prevent="createTask()"
    >
      <b-form-group>
        <b-row>
          <b-col cols="6">
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
          @click="createTask()"
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
          Criar Task
        </b-button>

        <b-button
          class="float-right"
          size="sm"
          variant="danger"
          @click="hideModal(`modal-create-task`)"
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
  computed: {},
  methods: {
    hideModal(modalId) {
      this.spinner.create = false;
      this.$root.$emit("bv::hide::modal", modalId);
    },

    async createTask() {
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
        .post(`/todos/${this.$route.params.id}/tasks`, payload)
        .then((response) => {
          console.log("Task criada com sucesso", response.data);
          this.$emit("loadTasks");
        })
        .catch((e) => {
          this.spinner.create = false;
          console.log(e);
        })
        .finally(() => {
          this.spinner.create = false;
        });

      //fechar a modal
      this.hideModal(`modal-create-task`);
    },
  },
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
</style>
