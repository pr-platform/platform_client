<script setup lang="ts">
import CreateLangForm from '../components/CreateLang.vue'
import DictionaryTable from '../components/DictionaryTable.vue'
import CreateLexemeForm from '../components/CreateLexeme.vue'
import { ref } from 'vue'

const dictionaryTable = ref(null)

const refetchDictionaryTableLexemes = () => {
  dictionaryTable.value.getAllLexemes()
}

const refetchDictionaryTableLangs = () => {
  dictionaryTable.value.fetchLangs()
}
</script>

<template>
  <div class="row">
    <div class="col col-12 q-mb-md">
      <CreateLangForm @lang-created="refetchDictionaryTableLangs" />
    </div>

    <div class="col col-12 q-mb-md">
      <CreateLexemeForm @lexeme-created="refetchDictionaryTableLexemes" />
    </div>

    <div class="col col-12">
      <DictionaryTable ref="dictionaryTable" />
    </div>
  </div>
</template>
