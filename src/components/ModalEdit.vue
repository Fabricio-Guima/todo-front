<template>
  <b-modal
    :id="`modal-${taskClone.id}`"
    size="lg"
    title="Editar Tarefa"
    footer="modal-footer"
  >
    <b-form>
      <b-form-group>
        <b-row>
          <b-col cols="6">
            <label for="example-datepicker">Finaliza em:</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="date"
              class="mb-2"
            ></b-form-datepicker>
          </b-col>
          <b-col cols="6">
            <label for="example-timepicker">Horário:</label>
            <b-form-timepicker
              id="example-timepicker"
              v-model="time"
              locale="en"
            ></b-form-timepicker>
          </b-col>
        </b-row>
        <label for="description">Descrição:</label>
        <b-form-textarea
          id="description"
          v-model="taskClone.description"
          :value="taskClone.description"
          size="lg"
        >
        </b-form-textarea>
      </b-form-group>
    </b-form>

    <template #modal-footer>
      <div class="w-100">
       
        <p><strong>Tarefa concluída: {{yesOrNo(task.done)}}</strong></p>
        <b-form-checkbox       
          class="float-left"
          v-model="taskClone.done"
          switch
          size="lg"
          > <span class="text-size">Concluir Tarefa</span></b-form-checkbox
        >       
        <b-button
          class="float-right ml-2"
          size="sm"
          variant="warning"
          @click="editTask(`modal-${taskClone.id}`)"
          :disabled="spinner.edit"
        >
          <img
            v-if="spinner.edit"
            src="@/assets/img/spinner.svg"
            alt=""
            width="20"
            height="20"
            class="d-inline-block"
          />
          Salvar Alterações
        </b-button>

        <b-button
          class="float-right"
          size="sm"
          variant="danger"
          @click="hideModal(`modal-${taskClone.id}`)"
        >
          Cancel
        </b-button>
      </div>
    </template>
    {{ taskClone }}
  </b-modal>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    taskClone: {},
    time: "",
    date: "",
    teste: false,
    spinner: {
      edit: false,
    },
  }),
  computed: {
     yesOrNo() {
      return (param) => (param ? "sim" : "não");
    },
  },
  methods: {
    hideModal(modalId) {
      this.spinner.edit = false;
      this.$root.$emit("bv::hide::modal", modalId);
    },

    async editTask(modalId) {
      //fingir que to validando com vee-validate
      if (
        this.time == "" ||
        this.date == "" ||
        this.taskClone.description == ""
      ) {
        console.log("Por favor. Preencha todos os campos corretamente");
        return;
      }

      this.spinner.edit = true;

      const payload = {
        done: true,
        description: this.taskClone.description,
        ends_at: `${this.date} ${this.time}`,
      };

      this.$axios
        .put(`/tasks/${this.task.id}`, payload)
        .then((response) => {
          console.log(response);
          this.$emit("loadTasks");
        })
        .catch((e) => {
          this.spinner.login = false;
          console.log(e);
        })
        .finally(() => {
          this.spinner.login = false;
        });

      //fechar a modal
      this.hideModal(modalId);
      console.log("payload", payload);
    },
  },
  created() {
    if (this.task) {
      this.taskClone = structuredClone(this.task);
      let splitedDate = this.taskClone.ends_at.split(" ");
      // checkbox do boostrap nao entende 0 ou 1 kkk
      this.taskClone.done
        ? (this.taskClone.done = true)
        : (this.taskClone.done = false);
      this.date = splitedDate[0];
      this.time = splitedDate[1];
    }
  },
};
</script>

<style scoped>

.text-size {
    font-size: 1rem;
}
</style>
