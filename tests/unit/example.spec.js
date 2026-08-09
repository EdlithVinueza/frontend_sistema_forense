import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('renders footer title correctly', () => {
    const wrapper = shallowMount(Footer)
    expect(wrapper.text()).toMatch('VerisArt Forense')
  })
})
