Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image">
        </div>        
        <div class="product-info">
            <h1>{{ title }}</h1>
            <span  v-if="onSale">On Sale</span>
            <p v-if="inStock">In Stock</p>
            <p v-else :style="{ 'text-decoration': 'line-through' }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</P>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            
            <div v-for="size in sizes">
                <span>{{ size }}</span>
            </div>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <button @click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart</button>
            <button @click="removeFromCart">Remove Cart</button>
        </div>
    </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            selectedVariant: 0,
            onSale: false,
            details: ["80% cotton", "20% polyster", "Gender-neutral"],
            sizes: ["XS", "S", "M", "L"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green", 
                    variantImage: "assets/vmSocks-green.jpg",
                    variantQuantity: 10,          
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "assets/vmSocks-blue.jpg",
                    variantQuantity: 0,           
                },
            ],
        }
    },
    methods: {
        addToCart: function(){
            this.cart += 1
        },
        removeFromCart: function(){
            if (this.cart > 0){
                this.cart -= 1
            }
        },
        updateProduct: function(index){
            console.log(index)
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage

        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if(this.premium) {
                return "Free"
            }
            return 2.99
        } 
    }    
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: 0,
    }
})