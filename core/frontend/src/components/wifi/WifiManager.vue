<template>
  <v-card
    elevation="1"
    width="500"
    max-height="80vh"
  >
    <v-sheet>
      <network-card
        v-if="current_network"
        connected
        :network="current_network"
        :ip-address="wifi_status.ip_address"
        @click="openDisconnectionDialog"
      />

      <v-sheet>
        <div v-if="connectable_networks !== null">
          <div v-if="!connectable_networks.isEmpty()">
            <network-card
              v-for="(network, key) in connectable_networks"
              :key="key"
              class="available-network"
              :network="network"
              @click="openConnectionDialog"
            />
          </div>
          <v-card-text
            v-else
            flat
            class="text-body-1"
          >
            No wifi networks available :(
          </v-card-text>
        </div>
        <div v-else>
          <spinning-logo
            size="30%"
            subtitle="Scanning for wifi networks..."
          />
        </div>
      </v-sheet>
    </v-sheet>

    <connection-dialog
      v-if="selected_network"
      v-model="show_connection_dialog"
      :network="selected_network"
    />

    <disconnection-dialog
      v-if="current_network"
      v-model="show_disconnection_dialog"
      :network="current_network"
      :status="wifi_status"
    />
  </v-card>
</template>

<script lang="ts">
import { uniqBy } from 'lodash'
import Vue from 'vue'

import wifi from '@/store/wifi'
import { Network, WifiStatus } from '@/types/wifi'

import SpinningLogo from '../common/SpinningLogo.vue'
import ConnectionDialog from './ConnectionDialog.vue'
import DisconnectionDialog from './DisconnectionDialog.vue'
import NetworkCard from './NetworkCard.vue'

export default Vue.extend({
  name: 'WifiManager',
  components: {
    NetworkCard,
    SpinningLogo,
    ConnectionDialog,
    DisconnectionDialog,
  },
  data() {
    return {
      selected_network: null as Network | null,
      show_connection_dialog: false,
      show_disconnection_dialog: false,
    }
  },
  computed: {
    wifi_status(): WifiStatus | null {
      return wifi.network_status
    },
    current_network(): Network | null {
      return wifi.current_network
    },
    connectable_networks(): Network[] | null {
      return uniqBy(wifi.connectable_networks, 'ssid')
    },
  },
  methods: {
    openConnectionDialog(network: Network): void {
      this.selected_network = network
      this.show_connection_dialog = true
    },
    openDisconnectionDialog(): void {
      this.show_disconnection_dialog = true
    },
  },
})
</script>
