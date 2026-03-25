import { create } from 'zustand';
import { toast } from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
    cart: [],
    isModalOpen: false,
    lastAddedItem: null,

    addToCart: (producto) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === producto.id);

        if (existingItem) {
            if (existingItem.cantidad >= producto.inventario) {
                toast.error('No puedes agregar más de la cantidad en stock.');
                return;
            }
            set({
                cart: cart.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                ),
                lastAddedItem: producto,
                isModalOpen: true
            });
        } else {
            if (producto.inventario < 1) {
                toast.error('Producto agotado.');
                return;
            }
            set({
                cart: [...cart, { ...producto, cantidad: 1 }],
                lastAddedItem: producto,
                isModalOpen: true
            });
        }
    },

    updateQuantity: (id, amount) => {
        const { cart } = get();
        const item = cart.find(i => i.id === id);
        if (!item) return;

        const newQuantity = item.cantidad + amount;

        if (newQuantity < 1) return;
        if (amount > 0 && newQuantity > item.inventario) {
            toast.error('Stock máximo alcanzado.');
            return;
        }

        set({
            cart: cart.map(i => i.id === id ? { ...i, cantidad: newQuantity } : i)
        });
    },

    removeFromCart: (id) => {
        set({ cart: get().cart.filter(item => item.id !== id) });
    },

    closeModal: () => set({ isModalOpen: false }),
    clearCart: () => set({ cart: [] }),

    getTotal: () => {
        return get().cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }
}));