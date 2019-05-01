import {
  mount
} from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Testing Card component', () => {
  test('is a Vue instance and have title, rate and Year', () => {
    const wrapper = mount(Card, {
      propsData: {
        id: "1",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg",
        year: "2018",
        title: "Black Panther",
        rating: 7,
      },
      stubs: ['nuxt-link']

    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toContain(
      '<p class="title is-4">Black Panther</p>'
    )
    expect(wrapper.html()).toContain(
      '<p class="is-4">Rate: 7</p>')
    expect(wrapper.html()).toContain('<p class="is-4">Year: 2018</p>')
  })
})
