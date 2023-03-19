<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import notify from '@/plugins/notify'
import { useQuasar } from 'quasar'
import { useLangStore } from '@/modules/lang/store'
import { storeToRefs } from 'pinia'
import langService from '../services'
import { GetAllLexemesArgs, GetOneLangResponse } from '../types'

const $q = useQuasar()
const langStore = useLangStore()
const { dictionary } = storeToRefs(langStore)
const { currentLang } = storeToRefs(langStore)
const notification = notify($q)

const lexemes = ref([])

const getAllLexemes = async (getAllLexemesArgs: GetAllLexemesArgs) => {
  try {
    const allLexemes = await langService.getAllLexemes(getAllLexemesArgs)
    lexemes.value = allLexemes.map((lexeme) => {
      return {
        ...lexeme,
        translation: lexeme?.translations?.[0] || {
          id: null,
          translation: '',
          langId: selectedLang.value.id,
          lexemeId: lexeme.id,
        },
      }
    })
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const allLangs = ref([])

const selectedLang = ref<GetOneLangResponse>({
  id: null,
  alias: '',
  lexeme: '',
})

const columns = [
  {
    name: 'lexeme',
    required: true,
    label: 'Lexemes',
    align: 'left',
    field: 'lexeme',
  },
  {
    name: 'translations',
    required: true,
    label: 'Lang',
    align: 'left',
    field: (val) => val?.translation?.translation,
  },
]

const changeLang = async (val) => {
  await getAllLexemes({
    include_translations: true,
    translations_lang_id: val.id,
  })
}

watch(currentLang, () => {
  if (!selectedLang.value.id) {
    selectedLang.value = currentLang.value
  }
})

const fetchLangs = async () => {
  try {
    allLangs.value = await langService.getLangs()
  } catch (error) {
    notification.error({ message: error.message })
  }
}

const saveTranslation = async (translation) => {
  try {
    if (!translation.id) {
      await langService.createTranslation({
        translation: translation.translation,
        langId: selectedLang.value.id,
        lexemeId: translation.lexemeId,
      })
    } else {
      await langService.updateTranslation(translation.id, {
        translation: translation.translation,
      })
    }

    getAllLexemes({
      include_translations: true,
      translations_lang_id: selectedLang.value.id,
    })

    notification.success({ message: 'Save success' })
  } catch (error) {
    notification.error({ message: error.message })
  }
}

onMounted(async () => {
  await getAllLexemes({
    include_translations: true,
    translations_lang_id: 1,
  })

  selectedLang.value = currentLang.value

  fetchLangs()
})

defineExpose({
  getAllLexemes: () => getAllLexemes({
    include_translations: true,
    translations_lang_id: selectedLang.value.id,
  }),
  fetchLangs,
})
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <q-table
        :columns="columns"
        row-key="lexeme"
        :rows="lexemes"
      >
        <template #header-cell-translations>
          <th>
            <q-select
              v-model="selectedLang"
              :options="allLangs"
              :option-label="(val) => dictionary[val.lexeme]"
              :label="dictionary.Lang"
              lazy-rules
              outlined
              dense
              hide-bottom-space
              @update:model-value="changeLang"
            />
          </th>
        </template>

        <template #body-cell-lexeme="{ row }">
          <td>
            <q-input
              v-model="row.lexeme"
              outlined
              dense
              hide-bottom-space
            />
          </td>
        </template>

        <template #body-cell-translations="{ row }">
          <td>
            <q-input
              v-model="row.translation.translation"
              outlined
              dense
              hide-bottom-space
            >
              <template v-slot:append>
                <q-btn
                  icon="save"
                  round
                  dense
                  flat
                  :disable="!row.translation.translation"
                  @click="saveTranslation(row.translation)"
                />
              </template>
            </q-input>
          </td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
