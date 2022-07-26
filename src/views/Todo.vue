<template>
  <div>
    <transition>
      <div class="container" v-if="tasks && tasks.length" key="hasTask">
        <div class="row justify-content-between align-items-center px-3">          
            <h1>Tasks</h1>  
            <b-button class="bg-primary" v-b-modal.modal-create-task
              >Criar Task</b-button
            >
            <ModalCreateTask @loadTasks="getTasks" />         
        </div>
        <div class="row">
          <div
            v-for="(task, index) in tasks"
            :key="index"
            class="col-sm-12 col-md-12 col-lg-12 mb-4 align-items-center"
          >
            <div class="card" style="">
              <div class="p-1 bg-primary">
                <p class="text-white font-weight-bold">
                  Finalizado: <span>{{ yesOrNo(task.done) }}</span>
                </p>
                <p class="text-white font-weight-bold">
                  Data limite: <span>{{ task.ends_at }}</span>
                </p>
                <div
                  class="d-flex position-relative"
                  style="height: auto; background: red !important"
                >
                  <b-badge class="position-absolute" variant="warning">{{
                    deadline(task.ends_at)
                  }}</b-badge>
                </div>
              </div>
              <div class="card-body">
                <span class="font-weight-bold"> Descrição: </span>
                <p class="card-text">
                  {{ task.description }}
                </p>

                <ModalEdit :task="task" @loadTasks="getTasks"/>
                <ModalDelete :id="task.id" @loadTasks="getTasks"/>
              </div>

              <div class="card-footer">
                <b-button class="float-left mr-3 bg-warning" v-b-modal="`modal-${task.id}`">Edit</b-button>
                <b-button class="float-left bg-danger" v-b-modal="`modal-delete-${task.id}`">Deletar</b-button>
                <p class="float-right mr-3">
                  <strong>Criado em:</strong> {{ formatDate(task.created_at) }}
                </p>
                <p class="float-right mr-3">
                  <strong>Atualizado em:</strong>
                  {{ formatDate(task.updated_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <Pagination :totalItems="totalItems" />
        </div>
      </div>

      <div
        class="container height"
        v-else-if="tasks && tasks.length === 0"
        key="hasNoProduct"
      >
        <div class="row flex-column">
          <h2 class="text-center">Não há tasks a serem visualizadas</h2>
          <b-button class="bg-primary" v-b-modal.modal-create-task
              >Criar Task</b-button
            >
            <ModalCreateTask @loadTasks="getTasks" />
        </div>
      </div>

      <div class="container height" v-else key="loading">
        <div class="row height justify-content-center align-items-center">
          <loading class="mt-5" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import ModalEdit from "@/components/ModalEdit.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import ModalCreateTask from "@/components/ModalCreateTask.vue";

export default {
  components: {
    Pagination,
    ModalEdit,
    ModalDelete,
    ModalCreateTask
  },
  props: ["id"],
  data() {
    return {
      tasks: [],
      totalItems: 0,
      showModal: false,
      footer: "white",
    };
  },
  computed: {
    url() {
      return `/todos/${this.id}/tasks?page=${Number(this.$route.query.page)}`;
    },
    yesOrNo() {
      return (param) => (param ? "sim" : "não");
    },
    deadline() {
      return (param) => {
        let splitedDate = param.split(" ");
        return Date.parse(splitedDate[0]) > Date.now()
          ? "Não Atrasado"
          : "Atrasado";
      };
    },
    formatDate() {
      return (param) => {
        let date = new Date(param);
        return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
      };
    },
  },
  methods: {
    getTasks() {
      this.tasks = null;   
      this.$axios.get(this.url).then((response) => {      
        this.tasks = response.data.data;
        this.totalItems = Number(response.data.meta.total);
      });
    },
    hideModal(modalId) {
      this.$root.$emit("bv::hide::modal", modalId);
    },
  },
  watch: {
    url() {
      this.getTasks();
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
a {
  text-decoration: none;
}
.container-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

div.card {
  min-height: 300px !important;
  border-radius: 4px;
}
.fake-img {
  width: 100%;
  height: 150px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  top: -20px;
  right: 0;
}

.height {
  height: 100vh !important;
}
</style>
