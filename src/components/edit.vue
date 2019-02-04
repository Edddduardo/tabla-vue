<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo back up</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="name_db" label="Nombre DB"></v-text-field><br>
                    <LAbel>{{}}</LAbel>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="name" label="Nombre archivo"></v-text-field><br>
                </v-flex> <br>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="date_backup" label="Fecha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="time_backup" label="Hora"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="user_db" label="Usuario db"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="password_db" label="Contraseña db"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
            <v-btn color="blue darken-1" flat @click="editar">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    data: () => {
        return{
            edit:false,
            desserts: [],
        }
    },

    methods: {
        initialize () {
        API.get('settings/'+item).then((response) =>{
         this.desserts = response.data
         console.log(desserts)
       })
      },
        editar () {
            this.edit=true;
        },

        close () {
        this.dialog = false
      },

      save () {
        API.post('settings',{
         name: this.name,
         name_db: this.name_db,
         user_db: this.user_db,
         password_db:this. password_db,
         date_backup: this.date_backup,
         time_backup: this.time_backup
       }).then((response)=>{
           this.$router.push({ name: '/table'})
           console.log(response)
       })
      },
    }
}
</script>
