import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Miras Sneakers</h3>
            <p className="text-gray-400 text-sm">
              Лучший магазин премиальных кроссовок в Казахстане. Оригинальная продукция с гарантией качества.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">О нас</a></li>
              <li><a href="#" className="hover:text-white transition">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-white transition">Возврат товара</a></li>
              <li><a href="#" className="hover:text-white transition">Гарантия</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Контакты</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Размерная сетка</a></li>
              <li><a href="#" className="hover:text-white transition">Блог</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 +7 (777) 123-45-67</li>
              <li>📧 info@miras-sneakers.kz</li>
              <li>📍 Алматы, ул. Абая 150</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  <a href="#" className="hover:text-white transition">Instagram</a>
                  <a href="#" className="hover:text-white transition">WhatsApp</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Miras Sneakers. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
