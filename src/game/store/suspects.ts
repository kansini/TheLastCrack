import { defineStore } from 'pinia'

interface Suspect {
  id: string
  name: string
  type: 'voiceprint' | 'fingerprint'
  matchScore: number
  audioFile?: string
  fingerprintFile?: string
}

export const useSuspectsStore = defineStore('suspects', {
  state: () => ({
    suspects: [] as Suspect[]
  }),

  actions: {
    addSuspect(suspect: Suspect) {
      // 检查是否已存在
      const exists = this.suspects.find(s => 
        s.name === suspect.name && s.type === suspect.type
      )
      if (!exists) {
        this.suspects.push(suspect)
      }
    },

    removeSuspect(name: string, type: 'voiceprint' | 'fingerprint') {
      const index = this.suspects.findIndex(s => 
        s.name === name && s.type === type
      )
      if (index > -1) {
        this.suspects.splice(index, 1)
      }
    },

    clearSuspects() {
      this.suspects = []
    }
  },

  getters: {
    getSuspectsByType: (state) => {
      return (type: 'voiceprint' | 'fingerprint') => 
        state.suspects.filter(s => s.type === type)
    },

    getOverlappingSuspects: (state) => {
      const names = new Set()
      const overlapping = new Set()
      
      state.suspects.forEach(suspect => {
        if (names.has(suspect.name)) {
          overlapping.add(suspect.name)
        }
        names.add(suspect.name)
      })
      
      return Array.from(overlapping)
    }
  }
}) 