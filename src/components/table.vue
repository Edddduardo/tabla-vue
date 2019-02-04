<template>
  <div>
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
                  <v-text-field v-model="name_db" label="Nombre DB"></v-text-field><br>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="name" label="Nombre archivo"></v-text-field><br>
                </v-flex> <br>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="date_backup" label="Fecha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="time_backup" label="Hora"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="user_db" label="Usuario db"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="password_db" label="Contraseña db"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- ///////// -->
      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle2 }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="name_db" label="Nombre DB"></v-text-field>
                      <p >{{ info.name_db }}</p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="name" label="Nombre Archivo"></v-text-field>
                      <p >{{ info.name }}</p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" v-model="user_db" label="Usuario db"></v-text-field>
                 <p >{{ info.user_db }}</p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-if="edit" type="password" v-model="password_db" label="Contraseña db"></v-text-field>
                   <p >{{ info.password_db }}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="editar">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- /////// -->
      
    <v-toolbar flat color="white">
      <v-toolbar-title>Respaldos</v-toolbar-title> <v-btn href="/table"> actualizar </v-btn>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td >{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.time_backup }}</td>
        <td class="text-xs-right">{{ props.item.created_at }}</td>
        <td class="text-xs-right"><v-btn style="background-color:green;">Crear respaldo</v-btn></td>
        
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            
            @click="editItem(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {API} from '../Servicios/Axios.js'
  export default {
    data: () => ({
        info: {},  
        id:'',
        edit:false,
      dialog2: false,
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Archivo', value: 'archivo' },
        { text: 'Fecha de Backup', value: 'fecha' },
        { text: 'HoraFecha de Backup', value: 'hora' },
        { text: 'Respaldar', value: 'respaldo' },
        { text: 'Eliminar', value: 'eliminar', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
      
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo ' : 'Editar'
      },
      formTitle2 () {
        return this.editedIndex === -1 ? 'Editar ' : 'Editar'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val2) {
        val2 || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        API.get('settings').then((response) =>{
         this.desserts = response.data
         console.log(desserts)
         this.close()
       })
      },
      mostrar(item){
        API.get('settings/'+item).then((response) =>{
          console.log(response)
          
        })
      },
      editItem (item) {
        this.edit = true
        this.dialog2 = true
        this.limpiar()
        API.get('settings/'+item).then((response) =>{
         this.info = response.data
         this.id = response.data.id
         console.log(this.info.id)
       })
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Estas seguro de querer eliminar este backup?') && this.desserts.splice(index, 1)
        API.delete('settings/'+item).then((response)=>{
          this.initialize()
       })
      },
      limpiar(){
        this.name_db = ''
        this.name = ''
        this.user_db = ''
        this.password_db= ''
        this.time_backup = ''
        this.date_backup = ''
      },

      close () {
        this.dialog = false
        this.dialog2 = false
        this.info = ''
        this.id= null
        this.name_db = ''
        this.name = ''
        this.user_db = ''
        this.password_db= ''
        this.time_backup = ''
        this.date_backup = ''
      },
      editar(info){
        API.put('settings/'+this.id,{
         "name": this.name,
         "name_db": this.name_db,
         "user_db": this.user_db,
         "password_db":this.password_db
       }).then((response)=>{
          this.dialog2 = false;

           console.log(response)
           this.id=''
           this.close()
           this.initialize()
       })
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
           this.$router.push({ name: 'table'})
           console.log(response)
           this.initialize()
           this.close()
       })
       
       this.$forceUpdate();
      },

    }
  }
</script>

<style>
body{
    background: #005aa7; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #005aa7, #fffde4); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #005aa7, #fffde4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
