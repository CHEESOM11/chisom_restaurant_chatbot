import { useRestaurant } from "../hooks/useRestaurant";

function CurrentOrder() {
  const { currentOrder } = useRestaurant();

  const safeOrder = Array.isArray(currentOrder)
    ? currentOrder.filter(Boolean)
    : [];

  const total = safeOrder.reduce(
    (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
    0
  );

  return (
    <div className="current-order">
      <h3>🛒 Current Order</h3>

      {safeOrder.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          {safeOrder.map((item, index) => (
            <div key={index}>
              <p>
                {item.quantity} x {item.name}
              </p>

              <small>₦{(item.price ?? 0) * (item.quantity ?? 0)}</small>

              <hr />
            </div>
          ))}

          <h4>Total: ₦{total}</h4>
        </>
      )}
    </div>
  );
}

export default CurrentOrder;